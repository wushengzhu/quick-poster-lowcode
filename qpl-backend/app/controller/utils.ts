import { Controller, FileStream } from 'egg';
// eslint-disable-next-line no-restricted-imports
import { parse, join, extname } from 'path';
import { nanoid } from 'nanoid';
import sendToWormhole from 'stream-wormhole';
import * as Busboy from 'busboy';
// eslint-disable-next-line no-restricted-imports
import { createWriteStream } from 'fs';

export default class UtilsController extends Controller {
  splitIdAndUuid(str = '') {
    const result = { id: '', uuid: '' };
    if (!str) return result;
    const firstDashIndex = str.indexOf('-');
    if (firstDashIndex < 0) return result;
    result.id = str.slice(0, firstDashIndex);
    result.uuid = str.slice(firstDashIndex + 1);
    return result;
  }
  /**
   *
   */
  async renderH5Page() {
    // id-uuid split('-')
    // uuid = aa-bb-cc
    const { ctx, app } = this;
    const { idAndUuid } = ctx.params;
    const query = this.splitIdAndUuid(idAndUuid);
    try {
      const pageData = await this.service.utils.renderToPageData(query);
      await ctx.render('page.nj', pageData);
    } catch (e) {
      ctx.helper.error({ ctx, errorType: 'h5WorkNotExistError' });
    }
  }
  /**
   *
   */
  async uploadToOSS() {
    const { ctx, app } = this;
    const stream = await ctx.getFileStream();
    // nanoid是一个在需要生成短而安全的唯一标识符时非常实用的工具
    // logo-backend /imooc-test/**.ext
    const savedOSSPath = join('qbl-test', nanoid(6) + extname(stream.filename));
    try {
      const result = await ctx.oss.put(savedOSSPath, stream);
      app.logger.info(result);
      const { name, url } = result;
      ctx.helper.success({ ctx, res: { name, url } });
    } catch (e) {
      await sendToWormhole(stream);
      ctx.helper.error({ ctx, errorType: 'imageUploadFail' });
    }
    // get stream saved to local file
    // file upload to OSS
    // delete local file

    // get stream upload to OSS
  }

  async uploadMutipleFiles() {
    const { ctx, app } = this;
    const { fileSize } = app.config.multipart;
    const parts = ctx.multipart({ limits: { fileSize: fileSize as number } });
    // { urls: [xxx, xxx ]}
    const urls: string[] = [];
    let part: FileStream | string[];
    while ((part = await parts())) {
      if (Array.isArray(part)) {
        app.logger.info(part);
      } else {
        try {
          const savedOSSPath = join('imooc-test', nanoid(6) + extname(part.filename));
          const result = await ctx.oss.put(savedOSSPath, part);
          const { url } = result;
          urls.push(url);
          if (part.truncated) {
            await ctx.oss.delete(savedOSSPath);
            return ctx.helper.error({ ctx, errorType: 'imageUploadFileSizeError', error: `Reach fileSize limit ${fileSize} bytes` });
          }
        } catch (e) {
          await sendToWormhole(part);
          ctx.helper.error({ ctx, errorType: 'imageUploadFail' });
        }
      }
    }
    ctx.helper.success({ ctx, res: { urls } });
  }
  uploadFileUseBusBoy() {
    const { ctx, app } = this;
    return new Promise<string[]>(resolve => {
      // Busboy用于处理multipart/form-data类型的HTTP请求体，这种类型通常用于文件上传
      const busboy = new Busboy({ headers: ctx.req.headers as any });
      const results: string[] = [];
      busboy.on('file', (fieldname, file, filename) => {
        app.logger.info(fieldname, file, filename);
        const uid = nanoid(6);
        const savedFilePath = join(app.config.baseDir, 'uploads', uid + extname(filename));
        file.pipe(createWriteStream(savedFilePath));
        file.on('end', () => {
          results.push(savedFilePath);
        });
      });
      busboy.on('field', (fieldname, val) => {
        app.logger.info(fieldname, val);
      });
      busboy.on('finish', () => {
        app.logger.info('finished');
        resolve(results);
      });
      ctx.req.pipe(busboy);
    });
  }
  async testBusBoy() {
    const { ctx, app } = this;
    const results = await this.uploadFileUseBusBoy();
    ctx.helper.success({ ctx, res: results });
  }
  // async fileLocalUpload() {
  //   const { ctx, app } = this
  //   const { filepath } = ctx.request.files[0]
  //   // 生成 sharp 实例
  //   const imageSource = sharp(filepath)
  //   const metaData = await imageSource.metadata()
  //   app.logger.debug(metaData)
  //   let thumbnailUrl = ''
  //   // 检查图片宽度是否大于 300
  //   if (metaData.width && metaData.width > 300) {
  //     // generate a new file path
  //     // /uploads/**/abc.png =》 /uploads/**/abc-thumbnail.png
  //     const { name, ext, dir } = parse(filepath)
  //     app.logger.debug(name, ext, dir)
  //     const thumbnailFilePath = join(dir, `${name}-thumbnail${ext}`)
  //     await imageSource.resize({ width: 300 }).toFile(thumbnailFilePath)
  //     thumbnailUrl = thumbnailFilePath.replace(app.config.baseDir, app.config.baseUrl)
  //   }
  //   const url = filepath.replace(app.config.baseDir, app.config.baseUrl)
  //   ctx.helper.success({ ctx, res: { url, thumbnailUrl: thumbnailUrl ? thumbnailUrl : url } })
  // }
  pathToURL(path: string) {
    const { app } = this;
    return path.replace(app.config.baseDir, app.config.baseUrl);
  }

  // async fileUploadByStream() {
  //   const { ctx, app } = this
  //   const stream = await this.ctx.getFileStream()
  //   // uploads/***.ext
  //   // uploads/xxx_thumbnail.ext
  //   const uid = nanoid(6)
  //   const savedFilePath = join(app.config.baseDir, 'uploads', uid + extname(stream.filename))
  //   const savedThumbnailPath = join(app.config.baseDir, 'uploads', uid + '_thumbnail' + extname(stream.filename))
  //   const target = createWriteStream(savedFilePath)
  //   const target2 = createWriteStream(savedThumbnailPath)
  //   const savePromise = pipeline(stream, target)
  //   const transformer = sharp().resize({ width: 300 })
  //   const thumbnailPromise = pipeline(stream, transformer, target2)
  //   try {
  //     await Promise.all([ savePromise, thumbnailPromise ])
  //   } catch (e) {
  //     return ctx.helper.error({ ctx, errorType: 'imageUploadFail' })
  //   }
  //   ctx.helper.success({ ctx, res: { url: this.pathToURL(savedFilePath), thumbnailUrl: this.pathToURL(savedThumbnailPath) } })
  // }
}
