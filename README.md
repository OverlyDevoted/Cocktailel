# Coctailel - Website about cocktails

Inspired by the [TheCocktailDB](https://www.thecocktaildb.com/api.php) and games such as Wordle, Rankdle and such.

## Github pages that also works on localhost

So path traversal can be tricky with web pages hosted on Github Pages. If you have a custom domain set up with Github pages, you will probably not encounter these problems, but if you are someone like me, who has a lot of pages hosted, who does not want to have one apex domain and who also is not interested in buying a domain for every single project, then these are some tips for navigating with an `<a>` and programmatically through JavaScript.

### The problem

The problem with web pages hosted on Github Pages is that the Github pages generated URL will always contain repository name as a subdirectory.

This creates some inconvenience and changes the way we usually do navigation with HTML and JavaScript. 

### Navigating with `<a>`

Using **relative** or **absolute** paths. Absolute paths are pretty self-explanatory, you just assign the whole URL into `href` attribute and it navigates well enough.

#### Example of an absolute path:
```html
<a href="https://user.github.io/repository/subdirectory">HyperLink</a>
```

In my opinion a more elegant solution is to use **relative** path traversal. With relative paths, you can use path traversal sequences `../` for navigation through server files.

#### Example of a relative path:

Let's say you start at `https://username.github.io/games/` and you wanted to go to the root page

```html
<a href="./../">HyperLink</a>
```

or

```html
<a href="/..">HyperLink</a>
```

### Navigating programmatically with JavaScript

This is where we have to implement somewhat of a workaround. You can't use `window.location` for navigation, as even when we try to conserve repository name as a subdirectory, we still get a 404 page.

These methods do not work

`window.location.assign(url)`
`window.location.href = url`

A working workaround is to create a `<a>` with a `href` attribute to the page you may want to visit and issuing a HTML element's prototype `click()`, this will nicely navigate to the desired page.

Example: 
```javascript
const aNavigator = document.createElement("a");
aNavigator.href = `./../?parameter=${id}`
aNavigator.click(); 
```