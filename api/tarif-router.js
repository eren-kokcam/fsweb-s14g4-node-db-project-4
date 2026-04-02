const express = require('express');
const Tarif = require('./tarif-model');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tarif = await Tarif.idyeGoreTarifGetir(id);

    if (tarif) {
      res.status(200).json(tarif);
    } else {
      res.status(404).json({ message: 'Tarif bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

module.exports = router;
