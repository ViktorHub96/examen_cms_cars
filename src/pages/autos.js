import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Car
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const AutosPage = () => {
  const {
    wpcontent: {
      page: {
        autosMeta: { autosKleineBeschrijving, autosBannerFoto },
      },
      autos: { edges: autos },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "autos", idType: URI) {
          autosMeta {
            autosKleineBeschrijving
            autosBannerFoto {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        autos {
          edges {
            node {
              auto {
                autoMerk
                autoModel
                autoBouwjaar
                autoBeschrijving
                autoFoto {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 50) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Cars" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={autosBannerFoto.imageFile.childImageSharp.fluid}
            alt={autosBannerFoto.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are Viktorius</h2>
          <p>{autosKleineBeschrijving}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="cars">
          <h2>Onze Auto's</h2>
          <div className="car-items">
            {autos.map(({ node: { auto, slug } }) => (
              <Car to={`/${slug}`} key={slug}>
                <Image
                  fluid={auto.autoFoto.imageFile.childImageSharp.fluid}
                  alt={auto.autoFoto.altText}
                />
                <div className="car-info">
                  <p>
                    {auto.autoMerk} {auto.autoModel}
                  </p>
                </div>
              </Car>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default AutosPage
