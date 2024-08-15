import { Typography } from "book-ui";

export const AboutPage = () => {
  return (
    <>
      <Typography component="h1" variant="h3">
        About
      </Typography>
      <br />

      <Typography>
        The reddit content (often called posts) and comments concerning three
        assets, AMC , GameStop (GST) and cryptocurrency ( Bitcoin , Ethereum and
        Dogecoin) were analysed separately for sentiment analysis using both
        VADER and a customised lexicon sentiment analyser to determine if there
        was a predictive value for the assets’ underlying publicly traded stock
        prices.
      </Typography>
      <br />
      <Typography>
        There are two main approaches to sentiment analysis – the lexical, or
        lexicon, approach and the machine learning approach. Lexical approaches
        analyse the underlying data for frequency of words in a customised
        lexicon or a “dictionary of sentiments”. Lexical approaches examine the
        sentiment category or score of each word in the sentence and determine
        the score of the particular text based on the frequency of
        lexicon-identified words.
      </Typography>
      <br />
      <Typography>
        Valence Aware Dictionary and Sentiment Analysis (VADER) is a sentiment
        machine learning package focused on sentiment expressed in social media.
        VADER takes into account negations and contractions ( “not good”,
        “wasn’t good”). . punctuation ( good !!!), capitalised words, emotion
        identification (“very”, “kind of”), acronyms etc. VADER relies on a
        lexicon and five general rules to map lexical features to sentiment
        scores. Threads and comments posted on Reddit are generally short,
        sometimes unstructured, sentences for which VADER is suitable. VADER is
        not specific to any topic or industry – VADER has been called “domain
        agnostic”. VADER does not capture the particular vernacular nor the
        expletive swear words nor the mis-spellings which are pervasive in the
        meme and crypto community communication.
      </Typography>
      <br />
      <Typography>
        The Sentiment Intensity Analyser object from the VADER package is used
        to extract the polarity scores which is a compound score for the
        comments. VADER uses a rule-based dictionary which is a list of words
        that are labelled as positive or negative based on their generic
        semantic orientation and can process emojis, emoticons and punctuation
        to increase the sentiment intensity. VADER also determines the extent of
        positivity or negativity. The compound score is the sum of the valence
        scores of each word in the lexicon.
      </Typography>
      <br />
      <Typography>
        The VADER sentiment analyser can be supplemented with e customised
        lexicon analysis for meme stocks and crypto currency with human-analysed
        words or phrases which could be emotive-positive or negative, with a net
        score being the combination of the two sentiments.
      </Typography>
      <br />
      <Typography>
        Despite the initial objectives, and despite the unsubstantiated
        assertions of so-called sentiment analyser web sites, the team were
        unable to authenticate any consistent price correlations between meme
        stocks and crypto-currency and underlying sentiment analysis.
      </Typography>
      <br />
      <Typography>
        Whilst the web scraping and sentiment analysis software successfully
        extracted the content and comments of the assets chosen, the resulting
        sentiment analysis comparing content and comments was replete with
        inconsistencies, and could not be relied upon. It is surprising that
        some of the purported competitor web sites , operating on more granular
        time frames, and thereby more likely to result in data inconsistencies,
        did not mention these issues.
      </Typography>
      <br />
      <Typography>
        Given the community culture of meme and crypto commentators, and the
        related reluctance to sell the underlying assets, it is not surprising
        that there are insufficient negative sentiment content or comments to
        allow price prediction.
      </Typography>
    </>
  );
};
