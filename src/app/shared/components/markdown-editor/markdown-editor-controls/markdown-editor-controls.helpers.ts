export const getSelectPosition = (element: HTMLTextAreaElement) => {
  const start = element.selectionStart;
  const end = element.selectionEnd;

  return [start, end];
};

export const getSelectText = (value: string, start: number, end: number) => {
  const selectedText = value.substring(start, end);
  const beforeText = value.substring(0, start);
  const afterText = value.substring(end);

  return [selectedText, beforeText, afterText];
};

export const formatText = (text: string, action: string) => {
  text ||= 'text';
  switch (action) {
    case 'bold':
      return `**${text}**`;
    case 'italic':
      return `*${text}*`;
    case 'strike':
      return `~~${text}~~`;
    case 'unordered_list':
      return (
        '\n' +
        text
          .split('\n')
          .map((line) => `- ${line}`)
          .join('\n')
      );
    case 'ordered_list':
      return (
        '\n' +
        text
          .split('\n')
          .map((line, index) => `${index + 1}. ${line}`)
          .join('\n')
      );
    case 'quote':
      return (
        '\n' +
        text
          .split('\n')
          .map((line) => `> ${line}`)
          .join('\n')
      );
    case 'link':
      return `[${text}](url)`;
    case 'image':
      return `![${text}](url)`;
    case 'code':
      return `\`${text}\``;
    default:
      return text;
  }
};
