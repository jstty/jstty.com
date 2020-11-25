import { 
    Controller, 
    Get, 
    Post, 
    Delete, 
    Put, 
    Body, 
    Param, 
    Req,
    Logger } from '@nestjs/common';
  import { JsttyModel } from '../model/jstty.model';
  import PDF from '../pdf';
  
  // export class GameInit {
  //   content: string;
  //   submittedBy: string;
  // }
  
  @Controller()
  export class JsttyResumeController {
    private readonly logger = new Logger(JsttyResumeController.name);
    private pdf;
  
    constructor(private readonly jsttyModel: JsttyModel) {
        let resume_template = require('../resume-templates/template');

        var path = require('path');
        var fontsDir = path.resolve("../pdf-fonts");
        var fonts = {
          Roboto: {
            normal: fontsDir+'/Roboto-Regular.ttf',
            bold: fontsDir+'/Roboto-Medium.ttf',
            italics: fontsDir+'/Roboto-Italic.ttf',
            bolditalics: fontsDir+'/Roboto-Italic.ttf'
          }
        };
        
        this.pdf = new PDF(this.logger);
        this.pdf.$init(resume_template, fonts)
    }
  
    @Get('/api/resume/showcase')
    async resumeShowcase(): Promise<object> {
      this.logger.log('resume showcase');

      let cv = await this.jsttyModel.getShowcaseCV();
      let cvPDF = await this.pdf.resume(cv, 'sp');

      return cvPDF;
    }

    @Get('/api/resume/full')
    async resumeFull(): Promise<object> {
      this.logger.log('resume showcase');

      let cv = await this.jsttyModel.getFullCV();
      let cvPDF = await this.pdf.resume(cv, 'full');

      return cvPDF;
    }
  
}
