# Key Labels of Compendium Structure

Compendiums will be broken down by the following section titles:

- Chapter
- Section
- SubSection

The following items would ideally be able to be placed into any location to provide flexability for formatting

- Bulk Text
- Figure

This should allow for clean integration into a final LaTeX output for the entire piece

The Compendium's top level will be a root object that is essentially the "book"

A compendium's data model may look like:

```
{
    bookID: Id String,
    bookName: Optional Book Name,
    bookContent: [
        Ordered ID Listing of Chapters & Specialty Elements
    ]
}
```

A chapter's data model may look like:

```
{
    chapterID: Id String,
    chapterName: Optional Chapter Name,
    chapterContent: [
        Ordered ID Listing of Sections & Specialty Elements
    ]
}
```

A section's data model may look like:

```
{
    sectionID: Id String,
    sectionName: Optional Section Name,
    sectionContent: [
        Ordered ID Listing of SubSections & Specialty Elements
    ]
}
```

A subsection's data model may look like:

```
{
    subsectionID: Id String,
    subsectionName: Optional SubSection Name,
    subsectionContent: [
        Ordered ID Listing of Specialty Elements to fill the subsection
    ]
}

All of this together should be able to lay out a structure for a tree like book to come together, with the ability to insert & organize one's notes together quite well