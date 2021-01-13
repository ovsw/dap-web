const groq = require('groq')
const client = require('../utils/sanityClient')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token


module.exports =  async function() {
  const sanityResponse = await client.fetch(groq`
    *[_type == "event"  && content.date > now()]{
      ...,
      content {
        ...,
        sections[] {
          ...,
          reusableSection->{
            ...
          }
        }
      }
    } | order(content.date desc)
  `).catch(err => console.error(err))

  const reducedDocs = overlayDrafts(hasToken, sanityResponse)

  return reducedDocs
}