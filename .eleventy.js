const svgContents = require("eleventy-plugin-svg-contents");
// const matter = require('gray-matter');

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.html');
  eleventyConfig.addLayoutAlias('lowfieldgreen', 'layouts/lowfieldgreen.html');
  eleventyConfig.addLayoutAlias('morrellhouse', 'layouts/morrellhouse.html');
  eleventyConfig.addLayoutAlias('invest', 'layouts/invest.html');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');
  eleventyConfig.addLayoutAlias('posts', 'layouts/posts.html');

  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  eleventyConfig.addPlugin(svgContents);

  // eleventyConfig.setFrontMatterParsingOptions({
  //   excerpt: true,
  //   excerpt_separator: "<!-- excerpt -->"
  // });

  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('uploads');
  // eleventyConfig.addPassthroughCopy({"/favicon/**" : "/"});

  eleventyConfig.addCollection('faqs', collection => {
    return collection.getFilteredByGlob('_faqs/*.md');
  });

  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("_posts/*.md")
    // .sort((a, b) => {
    //   console.log(a.data.title);
    //   if (a.data.title > b.data.title) return -1;
    //   else if (a.data.title < b.data.title) return 1;
    //   else return 0;
    // })
  );

  eleventyConfig.addCollection('pages', collection => {
    return collection.getFilteredByGlob('_pages/*.md');
  });

  // eleventyConfig.addFilter('where', function (array, key, value) {
  //   return array.filter(item => {
  //     const keys = key.split('.');
  //     const reducedKey = keys.reduce((object, key) => {
  //       return object[key];
  //     }, item);
  //
  //     return (reducedKey === value ? item : false);
  //   });
  //
  // });
  //
  eleventyConfig.addFilter('whereContains', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);
  
      return (reducedKey.indexOf(value) == -1 ? false : item);
    });
  });

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    root: [
      '_includes',
      '.'
    ]
  });

  return {
    dir: {
      input: "./",      // Equivalent to Jekyll's source property
      output: "./_site" // Equivalent to Jekyll's destination property
    },
    passthroughFileCopy: true,
    templateFormats: [
      "png",
      "ico",
      "svg",
      "xml",
      "webmanifest",
      "md",
      "html"
    ]
  };
};