export default {
  name: 'galerie',
  title: 'Image de galerie',
  type: 'document',
  fields: [
    {
      name: 'titre',
      type: 'string',
      title: 'Titre',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true
      }
    },
    {
      name: 'categorie',
      type: 'string',
      title: 'Catégorie',
      options: {
        list: [
          { title: 'Concert', value: 'concert' },
          { title: 'Studio', value: 'studio' },
          { title: 'Backstage', value: 'backstage' },
          { title: 'Tournée', value: 'tournee' },
          { title: 'Autre', value: 'autre' }
        ]
      }
    },
    {
      name: 'ordre',
      type: 'number',
      title: 'Ordre d\'affichage'
    },
    {
      name: 'estBackground',
      type: 'boolean',
      title: 'Est un background',
      description: 'Cochez si cette image doit être utilisée comme background',
      initialValue: false
    },
    {
      name: 'sectionBackground',
      type: 'string',
      title: 'Section pour le background',
      description: 'Si c\'est un background, pour quelle section ?',
      options: {
        list: [
          { title: 'Accueil (Hero)', value: 'accueil' },
          { title: 'Concerts', value: 'concerts' },
          { title: 'Membres', value: 'membres' },
          { title: 'Galerie', value: 'galerie' },
          { title: 'Contact', value: 'contact' },
          { title: 'Global (tout le site)', value: 'global' }
        ]
      },
      hidden: ({ parent }: any) => !parent?.estBackground
    }
  ],
  orderings: [
    {
      title: 'Ordre (croissant)',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }]
    },
    {
      title: 'Date (décroissant)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ]
}
