export const CONCERTS_QUERY = `
  *[_type == "concert"] | order(date asc) {
    _id,
    titre,
    date,
    heure,
    lieu,
    adresse,
    ville,
    description,
    descriptionLongue,
    affiche { asset->{ url } },
    lienTickets,
    statut,
    prixFcfa,
    programme[] {
      heure,
      activite
    }
  }
`

export const CONCERT_BY_ID_QUERY = `
  *[_type == "concert" && _id == $id][0] {
    _id,
    titre,
    date,
    heure,
    lieu,
    adresse,
    ville,
    description,
    descriptionLongue,
    affiche { asset->{ url } },
    lienTickets,
    statut,
    prixFcfa,
    programme[] {
      heure,
      activite
    }
  }
`

export const CONCERTS_A_VENIR_QUERY = `
  *[_type == "concert" && statut == "a-venir"] | order(date asc) {
    _id,
    titre,
    date,
    lieu,
    ville,
    description,
    affiche { asset->{ url } },
    lienTickets,
    statut
  }
`

export const MEMBRES_QUERY = `
  *[_type == "membre"] | order(ordre asc) {
    _id,
    nom,
    role,
    origine,
    bio,
    bioLongue,
    photo { asset->{ url } },
    ordre
  }
`

export const MEMBRE_BY_ID_QUERY = `
  *[_type == "membre" && _id == $id][0] {
    _id,
    nom,
    role,
    origine,
    bio,
    bioLongue,
    photo { asset->{ url } }
  }
`

export const GALERIE_QUERY = `
  *[_type == "galerie"] | order(ordre asc) {
    _id,
    titre,
    date,
    description,
    image { asset->{ url } },
    categorie,
    ordre,
    estBackground,
    sectionBackground
  }
`

export const GALERIE_BY_CATEGORIE_QUERY = `
  *[_type == "galerie" && categorie == $categorie] | order(ordre asc) {
    _id,
    titre,
    date,
    description,
    image { asset->{ url } },
    categorie,
    estBackground,
    sectionBackground
  }
`

export const BACKGROUND_BY_SECTION_QUERY = `
  *[_type == "galerie" && estBackground == true && sectionBackground == $section][0] {
    _id,
    titre,
    image { asset->{ url } },
    sectionBackground
  }
`
