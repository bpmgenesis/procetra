import { int } from '@tuval/core';
export class SvgMatrix {
    private bag: any = {};
    constructor({ a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = {}) {
        // save those instance values in an immutable map internally
        this.bag['a'] = a;
        this.bag['b'] = b;
        this.bag['c'] = c;
        this.bag['d'] = d;
        this.bag['e'] = e;
        this.bag['f'] = f;
    }

    plus(other) {
        // grab the elements from the other matrix
        const { a, b, c, d, e, f } = other

        let out = [[], [], []],
            m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x, y, z, res

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += m[x][z] * matrix[z][y];
                }
                out[x][y] = res;
            }
        }

        // batch the mutations together
        return new SvgMatrix({ 'a': out[0][0], 'b': out[1][0], 'c': out[0][1], 'd': out[1][1], 'e': out[0][2], 'f': out[1][2] });
    }

    inverse() {
        const x = this.a * this.d - this.b * this.c

        // return the inverse of the matrix
        return new SvgMatrix({
            a: this.d / x,
            b: -this.b / x,
            c: -this.c / x,
            d: this.a / x,
            e: (this.c * this.f - this.d * this.e) / x,
            f: (this.b * this.e - this.a * this.f) / x
        })
    }

    public reset() {
        const a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
        this.bag['a'] = a;
        this.bag['b'] = b;
        this.bag['c'] = c;
        this.bag['d'] = d;
        this.bag['e'] = e;
        this.bag['f'] = f;
    }

    translate(x, y) {
        // add the translation matrix
        return this.plus(new SvgMatrix({ e: x, f: y }))
    }

    rotate(deg, x = 0, y = 0) {
        // compute the angle to rotate in radians
        const rad = deg % 360 * Math.PI / 180,
            sin = +Math.sin(rad).toFixed(9),
            cos = +Math.cos(rad).toFixed(9)

        // add the rotation and appropriate translation
        return this.plus(new SvgMatrix({ a: cos, b: sin, c: -sin, d: cos, e: x, f: y }))
            .plus(new SvgMatrix({ e: -x, f: -y }))
    }

    scale(x, y, cx = 0, cy = 0) {
        // if there is no y value
        if (!y) {
            // use the x value
            y = x
        }

        return this.plus(new SvgMatrix({ e: cx, f: cy }))
            .plus(new SvgMatrix({ a: x, d: y }))
            .plus(new SvgMatrix({ e: -cx, f: -cy }))
    }

    get transformString() {
        return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`
    }

    // element accessors

    get a(): int {
        return this.bag['a']
    }

    get b(): int {
        return this.bag['b']
    }

    get c(): int {
        return this.bag['c']
    }

    get d(): int {
        return this.bag['d']
    }

    get e(): int {
        return this.bag['e']
    }

    get f(): int {
        return this.bag['f']
    }
}