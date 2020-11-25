import { Controller, Get, Post, Delete, Body, Req } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {
  }

  @Get('/api/v1/app/info')
  getInfo(): object {
    let manifest = require('../../package.json');

    return {
      version: manifest.version,
      hash: manifest.repository['current-hash']
    };
  }


}
