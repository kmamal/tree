const { test } = require('@kmamal/testing')
const { Node } = require('.')

class Named extends Node {
	constructor (name) {
		super()
		this.name = name
	}
}

const names = (node) => node.children.map((x) => x.name)

test("structs.tree append prepend insert", (t) => {
	const root = new Named('root')
	const a = new Named('a')
	const b = new Named('b')
	const c = new Named('c')
	const d = new Named('d')
	const e = new Named('e')

	root.appendChild(b)
	root.prependChild(a)
	c.appendTo(root)
	root.insertChildAt(1, d)
	e.insertAfter(a)
	t.equal(names(root), [ 'a', 'e', 'd', 'b', 'c' ])

	d.insertBefore(a)
	t.equal(names(root), [ 'd', 'a', 'e', 'b', 'c' ])
	t.equal(d.parent, root)
})

test("structs.tree remove", (t) => {
	const root = new Named('root')
	const a = new Named('a')
	const b = new Named('b')
	root.appendChild(a)
	root.appendChild(b)

	a.remove()
	t.equal(names(root), [ 'b' ])
	t.equal(a.parent, null)

	root.removeChild(b)
	t.equal(names(root), [])
	t.throws(() => root.removeChild(b))
})

test("structs.tree move between parents", (t) => {
	const p1 = new Named('p1')
	const p2 = new Named('p2')
	const a = new Named('a')
	p1.appendChild(a)
	p2.appendChild(a)
	t.equal(names(p1), [])
	t.equal(names(p2), [ 'a' ])
	t.equal(a.parent, p2)
})

test("structs.tree replace", (t) => {
	const root = new Named('root')
	const a = new Named('a')
	const b = new Named('b')
	const c = new Named('c')
	const d = new Named('d')
	root.appendChild(a)
	root.appendChild(b)

	c.replace(a)
	t.equal(names(root), [ 'c', 'b' ])
	t.equal(a.parent, null)
	t.equal(c.parent, root)

	b.replaceWith(d)
	t.equal(names(root), [ 'c', 'd' ])
	t.equal(b.parent, null)

	root.replaceChild(c, d)
	t.equal(names(root), [ 'd' ])
	t.equal(c.parent, null)
})
