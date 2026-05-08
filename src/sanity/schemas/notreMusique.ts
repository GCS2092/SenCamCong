export default {
  name: 'notreMusique',
  title: 'Notre Musique',
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
    }
  ]
}
