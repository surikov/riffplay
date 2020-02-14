function renum(n, r) {
    for (var i = 0; i < r.length; i++) {
        if (r[i].original == n) {
            return r[i].to;
        }
    }
    return n;
}
