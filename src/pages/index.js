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

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageTitle,
          homePageKleineBeschrijving,
          homePageBanner,
          featuredProducts
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "home-pagina", idType: URI) {
          homeMeta {
            homePageTitle
            homePageKleineBeschrijving
            homePageBanner {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            featuredProducts {
              ... on WPGraphql_Auto {
                id
                slug
                auto {
                  autoBeschrijving
                  autoBouwjaar
                  autoMerk
                  autoModel
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
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <div className="banner">
         <Image
            fluid={homePageBanner.imageFile.childImageSharp.fluid}
            alt={homePageBanner.altText}
          /> 
          <div className="inner-div">
            <p className="header-title">{homePageTitle}</p>
            <p className="header-description">{homePageKleineBeschrijving}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageKleineBeschrijving}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="cars">
          <h2>Featured Autos</h2>
         { <div className="car-items">
            {featuredProducts.map(({ auto, slug }) => (
              <Car key={slug} to={`/${slug}`}>
                <Image
                  fluid={auto.autoFoto.imageFile.childImageSharp.fluid}
                  alt={auto.autoFoto.altText}
                />
                <div className="car-info">
                  <p>
                    {auto.autoMerk} {auto.autoModel}
                  </p>
                  <p>{auto.autoBouwjaar}</p>
                </div>
              </Car>
            ))} 
          </div>}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage