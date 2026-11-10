import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Certification',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing organization',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Certification logo',
      type: 'image',
      description: 'Upload an approved certification logo to display beside the certification.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the logo for screen readers.',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'issuer', media: 'image' },
  },
})
