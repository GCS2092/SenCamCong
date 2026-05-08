export default {
  name: 'notreHistoire',
  title: 'Notre Histoire',
  type: 'document',
  fields: [
    {
      name: 'titre',
      type: 'string',
      title: 'Titre',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'evenements',
      type: 'array',
      title: 'Événements',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'annee',
              type: 'string',
              title: 'Année',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'titre',
              type: 'string',
              title: 'Titre',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ]
    }
  ]
}
