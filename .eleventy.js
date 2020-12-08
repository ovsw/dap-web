// following are required for portable text filter:
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const client = require('./src/utils/sanityClient.js')
const serializers = require('./src/utils/serializers')

module.exports = config => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  // Copy `./src/js/` to the dist folder
  config.addPassthroughCopy("./src/js/");

  // ////////////////////////////////////
  // process markdown from Sanity
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };

  config.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  config.addFilter("markdownify", function(value) {
    const md = new markdownIt(options)
    return md.render(value)
  })
  // end markdown 
  // ////////////////////////////////////

// ////////////////////////////////////
// filter to process portable text (block content) - needed for arrays of different sections from the back-end

config.addFilter("blocksToMarkdown", function(sanityBlockContent) {
  return BlocksToMarkdown(sanityBlockContent, { serializers, ...client.config() })
})

// end portable text filter
// ////////////////////////////////////


  // Nunjucks Filter for converting sring to kebab-case
  config.addNunjucksFilter("makeId", function(value) {
     return value.replace(/\s+/g, '-').toLowerCase()
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};