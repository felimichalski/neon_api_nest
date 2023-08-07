import { Controller, Get, Param, Res } from '@nestjs/common';
import { MediafilesService } from './mediafiles.service';
import * as sharp from 'sharp';
import { Readable } from 'stream';

@Controller('mediafiles')
export class MediafilesController {
  constructor(private readonly mediafilesService: MediafilesService) {}

  @Get(':objectKey')
  async get(@Param('objectKey') objectKey: string, @Res() response) {
    const file = await this.mediafilesService.get(objectKey);

    const body = file.Body as Readable;

    const buffers: Buffer[] = [];
    body.on('data', (chunk: Buffer) => buffers.push(chunk));
    body.on('end', () => {
      // Concatenar los buffers para obtener el contenido completo como un Buffer
      const buffer = Buffer.concat(buffers);

      // Crear una cadena para la imagen convertida en formato WebP
      sharp(buffer)
        .toFormat('webp')
        .toBuffer()
        .then((webpImage) => {
          // Configurar la cabecera de respuesta para indicar el tipo de contenido
          response.setHeader('Content-Type', 'image/webp');

          // Enviar la imagen convertida en formato WebP como respuesta
          response.send(webpImage);
        })
        .catch((error) => {
          response
            .status(500)
            .send(`Error al convertir la imagen a WebP: ${error.message}`);
        });
    });
  }
}
