const svgContents = require("eleventy-plugin-svg-contents");
// const matter = require('gray-matter');

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.html');
  eleventyConfig.addLayoutAlias('live', 'layouts/live.html');
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

  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('_posts/*.md');
  });

  eleventyConfig.addCollection('pages', collection => {
    return collection.getFilteredByGlob('_pages/*.md');
  });

  eleventyConfig.addFilter('where', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey === value ? item : false);
    });

  });

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

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  // The start and end separators to try and match to extract the excerpt


  const startPosition = content.indexOf('<p>');
  const endPosition = content.indexOf('</p>');
  const excerptLength = 150;

  if (startPosition !== -1 && endPosition !== -1) {
    excerpt = content.substring(startPosition + 3, endPosition).trim().substring(0,excerptLength) + '...';
  }
  else {
    excerpt = '';
  }

  return excerpt;
}