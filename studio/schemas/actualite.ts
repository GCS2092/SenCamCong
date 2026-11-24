export default {
  name: 'actualite',
  title: 'Actualité',
  type: 'document',
  fields: [
    {
      name: 'titre',
      type: 'string',
      title: 'Titre',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug (URL)',
      options: {
        source: 'titre',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Date de publication',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'categorie',
      type: 'string',
      title: 'Catégorie',
      options: {
        list: [
          { title: 'Actualité', value: 'actualite' },
          { title: 'Communiqué', value: 'communique' },
          { title: 'Musique', value: 'musique' },
          { title: 'Concert', value: 'concert' },
          { title: 'Événement', value: 'evenement' }
        ],
        layout: 'radio'
      },
      initialValue: 'actualite'
    },
    {
      name: 'extrait',
      type: 'text',
      title: 'Extrait',
      description: 'Court résumé affiché dans la liste des actualités'
    },
    {
      name: 'imagePrincipale',
      type: 'image',
      title: 'Image principale',
      options: {
        hotspot: true
      }
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Contenu',
      description: 'Blocs de texte et/ou images composant l\'article',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'titre',
              type: 'string',
              title: 'Sous-titre (optionnel)'
            },
            {
              name: 'texte',
              type: 'text',
              title: 'Texte',
              rows: 6
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image (optionnelle)',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'miseEnAvant',
      type: 'boolean',
      title: 'Mettre en avant',
      description: 'Affiche cette actualité en premier sur la page d\'accueil',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Date (décroissant)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    },
    {
      title: 'Date (croissant)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'date',
      media: 'imagePrincipale'
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
          : '',
        media
      }
    }
  }
}
