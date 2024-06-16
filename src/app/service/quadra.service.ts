import { Injectable, inject } from '@angular/core';
import { Quadra, QuadraForm } from '../interfaces/quadra';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

const PATH = 'quadras';

@Injectable({
  providedIn: 'root'
})
export class QuadraService {

  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  constructor() { }

  getAllQuadras() {
    return collectionData(this._collection, {idField: 'id'}) as Observable<Quadra[]>;
  }

  async getQuadraById(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Quadra;
      } catch (error) {
        return undefined;
      }
  }

  addQuadra(quadra: QuadraForm){
    return addDoc(this._collection, quadra)
  }

  updateQuadra(id: string, quadra: QuadraForm) {
    return updateDoc(this.document(id), { ...quadra });
  }

  deleteQuadra(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

  async getNomeQuadraById(id: string): Promise<string | undefined> {
    try {
      const snapshot = await getDoc(this.document(id));
      const quadra = snapshot.data() as Quadra | undefined;
      return quadra?.nome;
    } catch (error) {
      console.error('Erro ao buscar nome da quadra por ID:', error);
      return undefined;
    }
  }

  async getValorHoraById(id: string): Promise<number | undefined> {
    try {
      const snapshot = await getDoc(this.document(id));
      const quadra = snapshot.data() as Quadra | undefined;
      return quadra?.valorHora;
    } catch (error) {
      console.error('Erro ao buscar valor da hora por ID:', error);
      return undefined;
    }
  }

}
