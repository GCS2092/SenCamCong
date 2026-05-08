export default {
  name: 'nosPerformances',
  title: 'Nos Performances',
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
      name: 'concerts',
      type: 'number',
      title: 'Nombre de concerts',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'pays',
      type: 'number',
      title: 'Nombre de pays',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'spectateurs',
      type: 'string',
      title: 'Nombre de spectateurs',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'albums',
      type: 'number',
      title: 'Nombre d\'albums',
      validation: (Rule: any) => Rule.required()
    }
  ]
}
