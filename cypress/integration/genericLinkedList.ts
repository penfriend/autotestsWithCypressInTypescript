 class MyNode <T> {
    private _elem: T;
    private _next: MyNode <T>| null;

    get elem(): T {
        return this._elem;
    }

    get next(): MyNode <T>| null {
        return this._next;
    } 
    set next(value) {
       this._next = value;
    } 

    constructor(elem: T) {
        this._elem = elem;
        this._next = null;
    }
}

export class LinkedList <T> {
    private _head: MyNode <T>| null;
    private _tail: MyNode <T>| null;
    private _len: number = 0;

    constructor() {
        this._len = 0;
        this._head = null;
        this._tail = null;
    }

    get len(): number {
        return this._len;
    }

    get head(): MyNode <T>| null {
        return this._head;
    }

    get tail(): MyNode <T>| null {
        return this._tail;
    }

    public push(elem: T): void {
        let node = new MyNode(elem);
        if (this.head === null) {
            this._head = node;
        } 
        else if (this.head.next == null) {
            this.head.next = new MyNode(elem);
        } 
        else {
            //    finding the tail
            let current: MyNode <T>| null = this.head.next;
            while (current.next) {
                current = current.next
            }
            current.next = new MyNode(elem);
        }
        this._len++;
    }

    public pop():void {
        if (this.head === null) {
            return;
        } 
        else if (this.head.next == null) {
            this._head = null;
            this._len--;
            return;
        } 
        else {
            //    finding the tail
            let current: MyNode <T>| null = this.head.next;
            if(!current.next){
                this.head.next = null;
                this._len--;
                return;
            }
            let temp: MyNode <T>| null;
            while (current.next) {
                temp = current.next;
                if(!temp.next) {
                    current.next = null;
                    this._len--;
                    return;
                }
                else current = temp;
            }
        }

    }

    public toArray = (): T[] => {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.elem);
            current = current.next;
        }
        return result;
    };    
}

