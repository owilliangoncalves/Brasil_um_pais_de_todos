'use client';

import { EstadosPage } from '@/pages/EstadosPage';
import {Suspense} from "react";

export default function Estados() {
  return <Suspense fallback={<div>Carregando...</div>}>
    <EstadosPage />
  </Suspense>;

}
