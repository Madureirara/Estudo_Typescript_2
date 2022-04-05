import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController{
    private inputData: HTMLInputElement;
    private InputQuantidade: HTMLInputElement;
    private InputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView=new NegociacoesView("#negociacoesView",true);
    private mensagemView=new MensagemView("#mensagemView");

    constructor(){
        this.inputData=document.querySelector('#data');
        this.InputQuantidade=document.querySelector('#quantidade');
        this.InputValor=document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.InputQuantidade.value,
            this.InputValor.value
        );
        if(!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
            return ;
        }
        this.negociacoes.adiciona(negociacao);         
        this.limparFormulario();
        this.atualizaView();
    }
    private ehDiaUtil(data:Date){
        return data.getDate() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
    private limparFormulario():void{
        this.inputData.value='';
        this.InputQuantidade.value='';
        this.InputValor.value='';
        this.inputData.focus();
    }
    private atualizaView(){
        this.negociacoesView.update(this.negociacoes);  
        this.mensagemView.update('Negociação adicionada com sucesso'); 
    }
}