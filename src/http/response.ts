export class Response {
  protected statusCode: number = 200;
  protected headers: { [key: string]: string } = {};
  protected content: string = "";


  public setContent(content: string): Response {
    this.content = content;
    return this;
  }


  public getStatusCode(): number {
    return this.statusCode;
  }

  public setStatusCode(statusCode: number): Response {
    this.statusCode = statusCode;
    return this;
  }

  public getHeaders(): { [key: string]: string } {
    return this.headers;
  }

  public getHeader(key: string): string {
    return this.headers[key];
  }

  public setHeader(key: string, value: string): Response {
    this.headers[key] = value;
    return this;
  }

  public removeHeader(key: string): Response {
    delete this.headers[key];
    return this;
  }

  public setContentType(contentType: string): Response {
    this.setHeader("Content-Type", contentType);
    return this;
  }

  public getContent(): string {
    return this.content;
  }

  public getContentType(extension: string): string {
    const contentTypes: { [key: string]: string } = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".json": "application/json",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
      ".ttf": "font/ttf",
      ".wav": "audio/wav",
      ".mp3": "audio/mpeg",
      ".mp4": "video/mp4",
      ".txt": "text/plain",
      ".xml": "application/xml",
      ".pdf": "application/pdf",
    };

    return contentTypes[extension] || "text/plain";
  }

  public prepare(): void {
    if (this.content == null || this.content == "") {
      this.removeHeader("Content-Type");
      this.removeHeader("Content-Length");
    } else {
      this.setHeader("Content-Length", this.content.length.toString());
    }
  }

  public json(data: any): Response {
    this.setContentType("application/json");
    this.content = JSON.stringify(data);
    return this;
  }

  public send(content: string): Response {
    this.content = content;
    return this;
  }

  public sendFile(filePath: string): Response {
    const fs = require("fs");
    const path = require("path");

    const extension = path.extname(filePath);
    const contentType = this.getContentType(extension);

    this.setContentType(contentType);
    this.content = fs.readFileSync(filePath);
    return this;
  }

  public html(content: string): Response {
    this.setContentType("text/html");
    this.content = content;
    return this;
  }

  public text(content: string): Response {
    this.setContentType("text/plain");
    this.content = content;
    return this;
  }

  public redirect(url: string): Response {
    return this.setHeader("Location", url).setStatusCode(302);
  }


 
}
