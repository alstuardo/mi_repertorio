import fs from 'fs'
import path from 'path'

// GET WEBPAGE

const getFile = (req, res) => {
  res.sendFile(path.resolve('index.html'))
}

// GET CANCIONES

const getCanciones = (req, res) => {
  try {
    const repertorio = JSON.parse(fs.readFileSync('src/data/repertorio.json', 'utf8'))
    res.status(200).json(repertorio)
  } catch (error) {
    res.status(500).json({ message: 'Hay un error' })
  }
}

// POST CANCIONES

const postCanciones = (req, res) => {
  try {
    const cancion = req.body
    if (!cancion || !cancion.titulo || !cancion.artista || !cancion.tono) {
      return res.status(400).json({ message: 'Debe ingresar todos los datos' })
    }
    const repertorio = JSON.parse(fs.readFileSync('src/data/repertorio.json', 'utf8'))
    repertorio.push(cancion)
    fs.writeFileSync('src/data/repertorio.json', JSON.stringify(repertorio))
    res.status(201).send(`La cancion ${cancion.titulo} de ${cancion.artista} ha sido agregada`)
  } catch (error) {
    res.status(500).json({ message: 'El recurso no esta disponible' })
  }
}

// PUT CANCIONES

const putCanciones = (req, res) => {
  try {
    const { id } = req.params
    const cancion = req.body
    if (!id) {
      return res.status(400).send('El id de la canción es requerido')
    }
    const repertorio = JSON.parse(fs.readFileSync('src/data/repertorio.json'))
    const index = repertorio.findIndex(c => c.id === parseInt(id))
    repertorio[index] = cancion
    if (!cancion) {
      return res.status(404).send('La canción no fue encontrada')
    }
    cancion.id = repertorio[index].id
    repertorio[index] = cancion
    fs.writeFileSync('src/data/repertorio.json', JSON.stringify(repertorio))
    res.send(`La cancion ${cancion.titulo} fue actualizada`)
  } catch (error) {
    res.status(500).json({ message: 'El recurso no está disponible' })
  }
}

// DELETE CANCIONES

const deleteCanciones = (req, res) => {
  const { id } = req.params
  const repertorio = JSON.parse(fs.readFileSync('src/data/repertorio.json', 'utf8'))
  const index = repertorio.findIndex(c => c.id === id)
  repertorio.splice(index, 1)
  fs.writeFileSync('src/data/repertorio.json', JSON.stringify(repertorio))
  res.status(200).send('La canción fue eliminada')
}

export { getFile, getCanciones, postCanciones, putCanciones, deleteCanciones }
