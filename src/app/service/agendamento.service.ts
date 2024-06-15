import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Agendamento } from '../interfaces/agendamento';

const PATH = 'agendamentos';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor() { }

  getAllAgendamentos(): Observable<Agendamento[]> {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Agendamento[]>;
  }

  async getAgendamentoById(id: string): Promise<Agendamento | undefined> {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Agendamento;
    } catch (error) {
      return undefined;
    }
  }

  addAgendamento(agendamento: Agendamento) {
    return addDoc(this._collection, agendamento);
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }
}