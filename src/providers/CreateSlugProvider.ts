

export class CreateSlugProvider {

    async execute(title: string) {

        let Title = title.toLowerCase();
        Title = Title.replace(/  /g, '')
        Title = Title.replace(/[,.!?]/g, '')
        Title = Title.replace(/[/\|]/g, '')
        Title = Title.replace(/[áàãâä]/g, 'a')
        Title = Title.replace(/[éèêë]/g, 'e')
        Title = Title.replace(/[íìîï]/ui, 'i')
        Title = Title.replace(/[óòõôö]/ui, 'o')
        Title = Title.replace(/[úùûü]/ui, 'u')
        Title = Title.replace(/[ç]/g, 'c')
        Title = Title.replace(/ /g, '-')
    
        return Title

    }
}