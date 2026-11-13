/**
 * API penyimpanan Aplikasi Bendahara Revitalisasi.
 * Tempel di Google Sheet: Ekstensi > Apps Script.
 * GANTI TOKEN di bawah dengan kode rahasia Anda sendiri (minimal 20 karakter acak).
 */
const TOKEN = 'GANTI-DENGAN-KODE-RAHASIA-ANDA';
const HEAD = ['id','jenis','tgl','no','uraian','via','penyedia','alamat','items','jumlah','ppn','pph','jpph','pj','ntpn','keg'];

function sh_(n){ const ss = SpreadsheetApp.getActive(); return ss.getSheetByName(n) || ss.insertSheet(n); }
function out_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doGet(){ return out_({ ok:true, info:'API Bendahara Revitalisasi aktif' }); }

function doPost(e){
  try {
    const b = JSON.parse(e.postData.contents);
    if (b.token !== TOKEN) return out_({ error:'Token salah' });
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (b.action === 'load') return out_({ ok:true, data:read_() });
      if (b.action === 'save') { write_(b.data); return out_({ ok:true }); }
    } finally { lock.releaseLock(); }
    return out_({ error:'Aksi tidak dikenal' });
  } catch (err) { return out_({ error:String(err) }); }
}

function read_(){
  const v = sh_('Transaksi').getDataRange().getValues();
  const tx = [];
  for (let i = 1; i < v.length; i++) {
    const o = {};
    HEAD.forEach((h, j) => { o[h] = v[i][j] === undefined ? '' : v[i][j]; });
    if (o.id === '' || o.id === null) continue;
    o.id = Number(o.id);
    ['jumlah','ppn','pph'].forEach(k => { o[k] = o[k] === '' ? '' : Number(o[k]); });
    ['tgl','no','uraian','ntpn'].forEach(k => { if (o[k] instanceof Date) o[k] = Utilities.formatDate(o[k], Session.getScriptTimeZone(), 'yyyy-MM-dd'); else o[k] = String(o[k]); });
    tx.push(o);
  }
  const p = sh_('Pengaturan').getRange('A1').getValue();
  if (!p) return null;
  const m = JSON.parse(p);
  m.tx = tx;
  return m;
}

function write_(d){
  const t = sh_('Transaksi');
  t.clear();
  const rows = (d.tx || []).map(x => HEAD.map(h => x[h] == null ? '' : String(x[h])));
  const all = [HEAD].concat(rows);
  const rg = t.getRange(1, 1, all.length, HEAD.length);
  rg.setNumberFormat('@');
  rg.setValues(all);
  t.getRange(1, 1, 1, HEAD.length).setFontWeight('bold');
  t.setFrozenRows(1);
  const p = sh_('Pengaturan').getRange('A1');
  p.setNumberFormat('@');
  p.setValue(JSON.stringify({ id:d.id, ba:d.ba || {} }));
}
