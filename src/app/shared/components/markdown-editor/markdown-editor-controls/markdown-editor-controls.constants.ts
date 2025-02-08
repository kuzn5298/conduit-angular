interface FormatButton {
  action: string;
  icon: string;
}

export const FORMAT_BUTTONS: FormatButton[][] = [
  [
    {
      action: 'bold',
      icon: 'format_bold',
    },
    {
      action: 'italic',
      icon: 'format_italic',
    },
    {
      action: 'strike',
      icon: 'format_strikethrough',
    },
  ],
  [
    {
      action: 'unordered_list',
      icon: 'format_list_bulleted',
    },
    {
      action: 'ordered_list',
      icon: 'format_list_numbered',
    },
    {
      action: 'quote',
      icon: 'format_quote',
    },
    {
      action: 'code',
      icon: 'code',
    },
  ],
  [
    {
      action: 'link',
      icon: 'link',
    },
    {
      action: 'image',
      icon: 'image',
    },
  ],
];
