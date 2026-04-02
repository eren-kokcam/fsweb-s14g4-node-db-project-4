/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('adim_icindekiler').del();
  await knex('adimlar').del();
  await knex('icindekiler').del();
  await knex('tarifler').del();

  // Tarifler ekle
  await knex('tarifler').insert([
    { tarif_id: 1, tarif_adi: 'Spagetti Bolonez' },
    { tarif_id: 2, tarif_adi: 'Menemen' }
  ]);

  // İçindekiler ekle
  await knex('icindekiler').insert([
    { icindekiler_id: 1, icindekiler_adi: 'zeytinyağı' },
    { icindekiler_id: 2, icindekiler_adi: 'soğan' },
    { icindekiler_id: 3, icindekiler_adi: 'kıyma' },
    { icindekiler_id: 4, icindekiler_adi: 'domates salçası' },
    { icindekiler_id: 5, icindekiler_adi: 'spagetti' },
    { icindekiler_id: 6, icindekiler_adi: 'yumurta' },
    { icindekiler_id: 7, icindekiler_adi: 'domates' },
    { icindekiler_id: 8, icindekiler_adi: 'biber' }
  ]);

  // Adımlar ekle - Spagetti Bolonez
  await knex('adimlar').insert([
    {
      adim_id: 1,
      tarif_id: 1,
      adim_sirasi: 1,
      adim_talimati: 'Büyük bir tencereyi orta ateşe koyun'
    },
    {
      adim_id: 2,
      tarif_id: 1,
      adim_sirasi: 2,
      adim_talimati: '1 yemek kaşığı zeytinyağı ekleyin'
    },
    {
      adim_id: 3,
      tarif_id: 1,
      adim_sirasi: 3,
      adim_talimati: 'Soğanı doğrayın ve kavurun'
    },
    {
      adim_id: 4,
      tarif_id: 1,
      adim_sirasi: 4,
      adim_talimati: 'Kıymayı ekleyin ve pişirin'
    },
    {
      adim_id: 5,
      tarif_id: 1,
      adim_sirasi: 5,
      adim_talimati: 'Domates salçası ekleyin ve karıştırın'
    }
  ]);

  // Adımlar ekle - Menemen
  await knex('adimlar').insert([
    {
      adim_id: 6,
      tarif_id: 2,
      adim_sirasi: 1,
      adim_talimati: 'Tavayı ısıtın ve zeytinyağı ekleyin'
    },
    {
      adim_id: 7,
      tarif_id: 2,
      adim_sirasi: 2,
      adim_talimati: 'Biberleri doğrayıp kavurun'
    },
    {
      adim_id: 8,
      tarif_id: 2,
      adim_sirasi: 3,
      adim_talimati: 'Domatesleri ekleyin'
    },
    {
      adim_id: 9,
      tarif_id: 2,
      adim_sirasi: 4,
      adim_talimati: 'Yumurtaları kırın ve karıştırın'
    }
  ]);

  // Adım içindekiler ekle - Spagetti Bolonez
  await knex('adim_icindekiler').insert([
    { adim_id: 2, icindekiler_id: 1, miktar: 0.014 }, // zeytinyağı
    { adim_id: 3, icindekiler_id: 2, miktar: 1 },     // soğan
    { adim_id: 4, icindekiler_id: 3, miktar: 0.5 },   // kıyma
    { adim_id: 5, icindekiler_id: 4, miktar: 0.05 }   // domates salçası
  ]);

  // Adım içindekiler ekle - Menemen
  await knex('adim_icindekiler').insert([
    { adim_id: 6, icindekiler_id: 1, miktar: 0.02 },  // zeytinyağı
    { adim_id: 7, icindekiler_id: 8, miktar: 2 },     // biber
    { adim_id: 8, icindekiler_id: 7, miktar: 3 },     // domates
    { adim_id: 9, icindekiler_id: 6, miktar: 3 }      // yumurta
  ]);
};
