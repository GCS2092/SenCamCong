export default {
  name: 'membre',
  title: 'Membre',
  type: 'document',
  fields: [
    {
      name: 'nom',
      type: 'string',
      title: 'Nom complet',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'role',
      type: 'string',
      title: 'Rôle / Instrument',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'origine',
      type: 'string',
      title: 'Origine',
      description: 'Pays d\'origine',
      options: {
        list: [
          { title: 'Sénégal', value: 'Sénégal' },
          { title: 'Cameroun', value: 'Cameroun' },
          { title: 'Congo', value: 'Congo' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biographie',
      description: 'Courte biographie du membre'
    },
    {
      name: 'bioLongue',
      type: 'text',
      title: 'Biographie longue',
      description: 'Biographie détaillée pour la page de détail'
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: {
        hotspot: true
      }
    },
    {
      name: 'ordre',
      type: 'number',
      title: 'Ordre d\'affichage',
      description: 'Pour contrôler l\'ordre des membres sur la page'
    }
  ],
  orderings: [
    {
      title: 'Ordre (croissant)',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }]
    },
    {
      title: 'Nom (A-Z)',
      name: 'nomAsc',
      by: [{ field: 'nom', direction: 'asc' }]
    }
  ]
}
