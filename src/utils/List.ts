interface Linkable<T> {
    next: T | null;
    back: T | null;
}

export class List<T extends Linkable<T>> {
    private first: T | null = null;
    private last: T | null = null;
    private size: number;

    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    public push(newItem: T): void {
        this.size++;

        if (!this.last) {
            this.first = newItem;
            this.last = newItem;
            return;
        }

        newItem.back = this.last;
        this.last.next = newItem;
        this.last = newItem;

        this.last.next = this.first;
        this.first!.back = this.last;
    }

    public getArray(): T[] {
        const list: T[] = [];

        if (!this.first) return list;

        let x: T = this.first;

        while (x.next !== this.first) {
            list.push(x);
            if (x.next) x = x.next
        }

        list.push(x);

        return list;
    }

    public pop(index: T): void {
        console.log(index);
    }

    public showAll(): void {
        const x = this.first;
        if (x) this.show(x);
    }


    private show(x: T): void {
        console.log(x);
        if (x?.next !== this.first) this.show(x.next as T);
        return;
    }
}