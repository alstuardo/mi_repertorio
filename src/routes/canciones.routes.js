import { Router } from 'express'
import { getFile, getCanciones, postCanciones, putCanciones, deleteCanciones } from '../controllers/cancionesControllers.js'

const router = Router()

router.get('/', getFile)
router.get('/canciones', getCanciones)
router.post('/canciones', postCanciones)
router.put('/canciones/:id', putCanciones)
router.delete('/canciones/:id', deleteCanciones)

export default router
