export default {
  name: 'concert',
  title: 'Concert',
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
      type: 'datetime',
      title: 'Date',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'heure',
      type: 'string',
      title: 'Heure',
      description: 'Ex: 20h00'
    },
    {
      name: 'lieu',
      type: 'string',
      title: 'Lieu',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'adresse',
      type: 'string',
      title: 'Adresse',
      description: 'Adresse complète'
    },
    {
      name: 'ville',
      type: 'string',
      title: 'Ville',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description courte',
      description: 'Description affichée dans la carte'
    },
    {
      name: 'descriptionLongue',
      type: 'text',
      title: 'Description longue',
      description: 'Description complète pour la page de détail'
    },
    {
      name: 'affiche',
      type: 'image',
      title: 'Affiche',
      options: {
        hotspot: true
      }
    },
    {
      name: 'lienTickets',
      type: 'url',
      title: 'Lien billetterie'
    },
    {
      name: 'statut',
      type: 'string',
      title: 'Statut',
      options: {
        list: [
          { title: 'À venir', value: 'a-venir' },
          { title: 'Passé', value: 'passe' },
          { title: 'Complet', value: 'complet' }
        ],
        layout: 'radio'
      },
      initialValue: 'a-venir'
    },
    {
      name: 'prix',
      type: 'string',
      title: 'Prix',
      description: 'Ex: À partir de 35€'
    },
    {
      name: 'programme',
      type: 'array',
      title: 'Programme',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heure',
              type: 'string',
              title: 'Heure'
            },
            {
              name: 'activite',
              type: 'string',
              title: 'Activité'
            }
          ]
        }
      ]
    }
  ],
  orderings: [
    {
      title: 'Date (croissant)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    },
    {
      title: 'Date (décroissant)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ]
}
