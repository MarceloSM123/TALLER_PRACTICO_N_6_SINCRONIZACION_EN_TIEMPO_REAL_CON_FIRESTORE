import { db } from '../fireBase'
import { collection, addDoc, getDocs, updateDoc,doc, deleteDoc} from 'firebase/firestore'

export interface Producto {
  nombre: string
  precio: number
  stock: number
  categoria: string
}
// taller 2
export interface ProductoConId extends Producto {
  id: string
}
//---------Taller 1
export async function crearProducto(
  nombre: string,
  precio: number,
  stock: number,
  categoria: string
): Promise<string> {
  const producto: Producto = { nombre, precio, stock,categoria }
  const docRef = await addDoc(collection(db, 'productos'), producto)
  return docRef.id
}

//----------Taller 2

export const obtenerProductos = async (): Promise<ProductoConId[]> => {
  const querySnapshot = await getDocs(collection(db, 'productos'))
  const productos=querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductoConId[]
  return productos
  }
    
//---Actualizar producto
export const actualizarProducto = async (
    id: string,
    nombre: string,
    precio: number,
    stock: number,
    categoria: string

)=>{
const productoRef =doc(db, 'productos', id)
await updateDoc(productoRef, {
    nombre,
    precio,
    stock,
    categoria
}
)}

//-------Taller 5
export const eliminarProducto = async (id: string) => {
  const productoRef = doc(db, 'productos', id)
  await deleteDoc(productoRef)
}

