import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({ name: 'markdown', standalone: true })
export class MarkdownPipe implements PipeTransform {
  transform(value: string) {
    const src = value.replaceAll('\\n', '  \n');
    return marked.parse(src);
  }
}
