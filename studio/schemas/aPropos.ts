export default {
  name: 'aPropos',
  title: 'À Propos',
  type: 'document',
  fields: [
    {
      name: 'titre',
      type: 'string',
      title: 'Titre',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'senegal',
      type: 'object',
      title: 'Sénégal',
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
    },
    {
      name: 'cameroun',
      type: 'object',
      title: 'Cameroun',
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
    },
    {
      name: 'congo',
      type: 'object',
      title: 'Congo',
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
  ]
}
