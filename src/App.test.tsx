import React from 'react';
import {render, screen} from '@testing-library/react';
import {MainApp} from './App';

// тест кейс
test('expect text on page "Quantity signs"', () => {
    // отрисовка компоненты
    render(<MainApp/>);
    // поиск элемента на странице
    const linkElement = screen.getByText(/quantity signs/i);
    expect(linkElement).toBeInTheDocument();
});

// тест кейс
test('expect text on page "Rus"', () => {
    // отрисовка компоненты
    render(<MainApp/>);
    // поиск элемента на странице
    const linkElement = screen.getByText(/rus/i);
    expect(linkElement).toBeInTheDocument();
});

// тест кейс
test('expect text on page "Eng"', () => {
    // отрисовка компоненты
    render(<MainApp/>);
    // поиск элемента на странице
    const linkElement = screen.getByText(/eng/i);
    expect(linkElement).toBeInTheDocument();
});

// тест кейс
test('expect text on page "Signs"', () => {
    // отрисовка компоненты
    render(<MainApp/>);
    // поиск элемента на странице
    const linkElement = screen.getByText(/signs/i);
    expect(linkElement).toBeInTheDocument();
});

// тест кейс
test('expect text on page "num"', () => {
    // отрисовка компоненты
    render(<MainApp/>);
    // поиск элемента на странице
    const linkElement = screen.getByText(/num/i);
    expect(linkElement).toBeInTheDocument();
});