/** Adopted from https://github.com/developit/vhtml */

// escape an attribute
let map = { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "apos" };
let esc = (str: string | number | boolean) =>
  String(str).replace(/[&<>"']/g, (s) => `&${map[s]};`);

let sanitized = {};

/** Hyperscript reviver that constructs a sanitized HTML string. */
export default function h(
  name: string | null,
  attrs: Record<string, string | number | boolean | null | undefined> = {},
  ...children: (string | string[])[]
) {
  let stack = children.reverse(),
    s = "",
    isSelfclosing = !stack.length;

  if (name) {
    s += "<" + name;
    if (attrs) {
      for (let i in attrs) {
        if (attrs[i] !== false && attrs[i] != null) {
          s += ` ${esc(i)}="${esc(attrs[i])}"`;
        }
      }
    }
    if (isSelfclosing) {
      s += "/";
    }
    s += ">";
  }

  while (stack.length) {
    let child = stack.pop();
    if (child) {
      if (Array.isArray(child)) {
        for (let i = child.length; i--; ) stack.push(child[i]);
      } else {
        s += sanitized[child] === true ? child : esc(child);
      }
    }
  }

  s += name && !isSelfclosing ? `</${name}>` : "";

  sanitized[s] = true;
  return s;
}
