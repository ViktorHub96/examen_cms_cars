import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {Wrapper, Image} from './templateStyles/artistStyles'

const Auto = ({
    data:{
        wpcontent:{
            auto:{
                auto,
                roles:{ edges: roles}
            }
        }
    }
}) => {
    return <Layout>
        <SEO title ="Auto" />
        <Wrapper>
            <div className ="car-container">
                <div className="car-image">
                <Image fluid={auto.autoFoto.imageFile.childImageSharp.fluid} alt={auto.autoFoto.altText} />
                <div className="roles">
                    {roles.map(({node: roles}) => (
                        <div className="role">
                            {roles.name}
                        </div>
                    ))}
                </div>
                </div>
                <div className="car-info">
                    <h2>{auto.autoMerk}</h2>
                    <h3><span>{auto.autoModel}</span> - <span>{auto.autoBouwjaar}</span></h3>
                    <h5><span>{auto.autoBeschrijving}</span></h5>
                   
                </div>
            </div>
        </Wrapper>
    </Layout>
    
}

export default Auto

export const pageQuery = graphql`
query ($id: ID!){
wpcontent {
  auto(id: $id, idType: ID) {
    roles {
      edges {
        node {
          name
        }
      }
    }
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
          fluid(quality: 75){
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
}
}
}
}
`