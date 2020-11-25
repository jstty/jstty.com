import { resolve } from 'path';
import { 
    Controller, 
    Get, 
    Post, 
    Delete, 
    Put, 
    Body, 
    Param, 
    Req,
    Res,
    Logger } from '@nestjs/common';
  import { Response } from 'express';
  import { JsttyModel } from '../model/jstty.model';
  import PDF from '../pdf';
  
  @Controller()
  export class JsttyResumeController {
    private readonly logger = new Logger(JsttyResumeController.name);
    private pdf;
  
    constructor(private readonly jsttyModel: JsttyModel) {
        let resume_template = require('../resume-templates/template');

        let fontsDir = resolve(__dirname, '../pdf-fonts');
        let fonts = {
          Roboto: {
            normal: fontsDir+'/Roboto-Regular.ttf',
            bold: fontsDir+'/Roboto-Medium.ttf',
            italics: fontsDir+'/Roboto-Italic.ttf',
            bolditalics: fontsDir+'/Roboto-Italic.ttf'
          }
        };
        // console.log('fontsDir:', fontsDir);
        // console.log('fonts:', fonts);
        
        this.pdf = new PDF(this.logger);
        this.pdf.$init(resume_template, fonts)
    }
  
    @Get('/api/resume/showcase')
    async resumeShowcase(@Res() res: Response): Promise<void> {
      // this.logger.log('resume showcase');

      let cv = await this.jsttyModel.getShowcaseCV();
      let cvPDF = await this.pdf.resume(cv, 'sp');

      let headers = {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${cvPDF.filename}`,
        'Content-Length': cvPDF.data.length,
      };

      res.set(headers);
      res.end(cvPDF.data);
    }

    @Get('/api/resume/full')
    async resumeFull(@Res() res: Response): Promise<void> {
      // this.logger.log('resume full');

      let cv = await this.jsttyModel.getFullCV();
      let cvPDF = await this.pdf.resume(cv, 'full');

      let headers = {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${cvPDF.filename}`,
        'Content-Length': cvPDF.data.length,
      };

      res.set(headers);
      res.end(cvPDF.data);
    }
  
}
