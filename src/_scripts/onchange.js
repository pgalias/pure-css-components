export default function onChange(self, child, regexp, replace = '', checkbox = false) {
  const txt = self.attr('data-class-name');
  const selector = self.closest('article').find('pre').find(child);
  const type = child === 'code' ? 'html' : 'text';
  const code = selector[type]();

  replace = checkbox === true
    ? (code.match(regexp) ? code.replace(regexp, '') : `${code.substr(0, code.length - 1)}${txt}"`)
    : (replace || txt);

  replace = checkbox !== true
    ? code.replace(regexp, replace)
    : replace;

  selector[type](replace);
}