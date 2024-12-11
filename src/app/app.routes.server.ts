import { Component } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ProgrammComponent } from './components/programm/programm.component';
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
];
