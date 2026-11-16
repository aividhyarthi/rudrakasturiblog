// Markdown tables are wrapped in a scrolling box, so a wide table scrolls sideways on a phone instead of squeezing its columns.
function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    walk(child);
    if (child.type === 'element' && child.tagName === 'table') {
      return { type: 'element', tagName: 'div', properties: { className: ['tw'] }, children: [child] };
    }
    return child;
  });
}
export default function rehypeWrapTables() {
  return (tree) => walk(tree);
}
