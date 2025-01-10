const mLink = (calc, hash) => `https://www.desmos.com/${calc}/${hash}`;

async function findHistory(
    link, // i.e. https://www.desmos.com/calculator/abcdef0000
    list = [],
) {
    let [calc, hash] = link.split("desmos.com/")[1].split('/');
    list.push(hash);
    fetch(mLink(calc, hash), {
        headers: { Accept: "application/json" },
    })
        .then(e => e.json())
        .then(e => {
            let newHash = e.parent_hash;
            if (newHash) findHistory(mLink(calc, newHash), list);
            else console.log(list.map(h => mLink(calc, h)).join("\n"));
        });
}

// use it like this:
// findHistory("https://www.desmos.com/calculator/abcdef0000")
// you might have to wait a while
