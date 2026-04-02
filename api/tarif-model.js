const db = require('../data/db-config');

async function idyeGoreTarifGetir(tarif_id) {
  // Tarif bilgilerini al
  const tarif = await db('tarifler')
    .where({ tarif_id })
    .first();

  if (!tarif) {
    return null;
  }

  // Bu tarife ait tüm adımları al
  const adimlar = await db('adimlar')
    .where({ tarif_id })
    .orderBy('adim_sirasi');

  // Tüm adımların içindekilerini tek sorguda al
  const adimIds = adimlar.map(adim => adim.adim_id);

  const adimIcindekiler = await db('adim_icindekiler as ai')
    .join('icindekiler as i', 'ai.icindekiler_id', 'i.icindekiler_id')
    .whereIn('ai.adim_id', adimIds)
    .select(
      'ai.adim_id',
      'i.icindekiler_id',
      'i.icindekiler_adi',
      'ai.miktar'
    );

  // Her adım için içindekilerini grupla
  const adimlarWithIcindekiler = adimlar.map(adim => {
    const icindekiler = adimIcindekiler
      .filter(ai => ai.adim_id === adim.adim_id)
      .map(ai => ({
        icindekiler_id: ai.icindekiler_id,
        icindekiler_adi: ai.icindekiler_adi,
        miktar: ai.miktar
      }));

    return {
      adim_id: adim.adim_id,
      adim_sirasi: adim.adim_sirasi,
      adim_talimati: adim.adim_talimati,
      icindekiler: icindekiler
    };
  });

  // Son tariyi oluştur
  return {
    tarif_id: tarif.tarif_id,
    tarif_adi: tarif.tarif_adi,
    kayit_tarihi: tarif.kayit_tarihi,
    adimlar: adimlarWithIcindekiler
  };
}

module.exports = {
  idyeGoreTarifGetir
};
