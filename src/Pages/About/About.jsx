import React, { useEffect } from 'react';
import './about.css';
import { Fade } from 'react-reveal';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='AboutContainer'>
      <Fade delay={200} distance={'5%'} force={true}>
        <h1 className='titleAbout'> About</h1>
      </Fade>
      <Fade left delay={300} distance={'5%'} force={true}>
        <p className='textAbout'>
          The Robin Hood Calculator is an interactive tool for visualizing
          global income distribution. In this visualization, you have the
          ability to apply taxes to various income brackets or the ten richest
          individuals, with the goal of lifting people out of extreme poverty.
          Income inequality is a problem that is underestimated by many [1, 2],
          and this tool seeks to raise awareness and improve users'
          understanding of the issue.
          <br></br>
          <br></br>
          This project was proposed by Angie Hjort at Gapminder with the aim to
          continue the development of their own visualization of income
          distribution by adding the functionality of redistribution. This
          visualization has therefore taken a lot of inspiration from{' '}
          <a
            href='https://www.gapminder.org/tools/#$ui$chart$showBilly:true;;&model$markers$mountain$data$filter$dimensions$geo$is--global:true;;;;&encoding$mu$scale$domain@:0.11&:100000000;;;&facet_row$data$constant=none;;;;&billy$encoding$x$data$concept=daily_income;;&name$data$concept=name;;&slices$data$concept=countries;;&selected$data$;;;;;;&chart-type=mountain&url=v1'
            target='blank'
            className='gapminderlink'
          >
            Gapminder's visualization
          </a>
          . To view the code of this project, feel free to visit our{' '}
          <a
            href=' https://github.com/Amandabru/RobinHoodCalc'
            target='blank'
            className='gapminderlink'
          >
            Github
          </a>
          .<br></br>
          <p className='diamondStyle'>◆ ◆ ◆</p>
        </p>
      </Fade>
      <Fade right delay={400} distance={'5%'} force={true}>
        <h2 className='headerPadding'>Data</h2>
        <p className='textAbout'>
          The data in the visualization is from datasets assembled by{' '}
          <a
            href='https://www.gapminder.org/'
            target='blank'
            className='gapminderlink'
          >
            Gapminder
          </a>
          . The data contains information about the income distribution of the
          world and information about the ten richest people. The dataset
          containing data about the population in different income brackets can
          be found{' '}
          <a
            href='https://github.com/open-numbers/ddf--worldbank--povcalnet/blob/develop/income_mountain/ddf--datapoints--income_mountain_800bracket_shape_for_log--by--global--time.csv'
            target='blank'
            className='gapminderlink'
          >
            here
          </a>
          , and the correspoding income brackets (representing a specific income
          per day) can be found{' '}
          <a
            href='https://github.com/open-numbers/ddf--worldbank--povcalnet/blob/develop/ddf--entities--income_bracket_800.csv'
            target='blank'
            className='gapminderlink'
          >
            here
          </a>
          . There is a total of 800 income brackets and the used value for each
          bracket is the arithmetic average between the start and end of the
          bracket. The billionaire data can be found{' '}
          <a
            href='https://github.com/open-numbers/ddf--gapminder--billionaires/blob/master/ddf--datapoints--daily_income--by--person--time.csv'
            target='blank'
            className='gapminderlink'
          >
            here
          </a>
          .<br></br>
          <p className='diamondStyle'>◆ ◆ ◆</p>
        </p>
      </Fade>
      <Fade left delay={500} distance={'5%'} force={true}>
        <h2 className='headerPadding'>Tools</h2>
        <p className='textAbout'>
          This project is built using React and D3.js. Prototyping was done
          using Figma.
          <br></br>
          <p className='diamondStyle'>◆ ◆ ◆</p>
        </p>
      </Fade>
      <Fade right delay={600} distance={'5%'} force={true}>
        <h2 className='headerPadding'>Credits</h2>
        <p className='textAbout'>
          We would like to acknowledge and thank{' '}
          <b>
            <a
              href='https://github.com/angiehjort'
              target='blank'
              className='gapminderlink'
            >
              Angie Hjort
            </a>
          </b>{' '}
          from Gapminder for proposing this idea, sharing the data, and
          supporting us throughout the work process. We also appreciate{' '}
          <b>
            <a
              href='https://github.com/semio'
              target='blank'
              className='gapminderlink'
            >
              Semio Zheng
            </a>
          </b>{' '}
          for putting together the high-resolution world income dataset and{' '}
          <b>Ola Rosling</b> for taking the time to review our project and
          giving us valuable feedback. Lastly, we would like to thank{' '}
          <b>Mario Romero Vega</b>, our lecturer and course responsible for the{' '}
          <a
            href='https://www.kth.se/student/kurser/kurs/DH2321?l=en'
            target='blank'
            className='gapminderlink'
          >
            Information Visualization course
          </a>
          , for his active engagement and ongoing input, which helped us advance
          this project.
          <br></br>
          <p className='diamondStyle'>◆ ◆ ◆</p>
        </p>
      </Fade>
      <Fade left delay={700} distance={'5%'} force={true}>
        <h2 className='headerPadding'>Learning Goals</h2>
        <div className='textAbout'>
          <p className='learningTitle'>
            Throughout this project we have achieved the following learning
            goals:
          </p>
          <ul>
            <li>
              Applying principles of visual perception and techniques for
              visualizing data.
            </li>
            <li>
              Gained a better understanding of how to make visualizations
              valuable by making the interpretation intuitive.
            </li>
            <li>
              Learned D3.js, improved our React skills and learned how to
              combine React with D3 in web development.
            </li>
            <li>Setting up a server for the web application.</li>
            <li>
              Practiced evaluating and discussing design choices within a team.
            </li>
          </ul>
          <p className='diamondStyle'>◆ ◆ ◆</p>
        </div>
      </Fade>

      <Fade right delay={800} distance={'5%'} force={true}>
        <div className='references'>
          <h2 className='headerPadding'>References</h2>
          <p className='textAbout'>
            [1] J. R. Chambers, L. K. Swan, and M. Heesacker, “Better Off Than
            We know,” Psychological Science, vol. 25, no. 2, pp. 613–618, 2013.
            <br></br>
            <br></br>
            [2] G. Zucman, “Global wealth inequality,” Annual Review of
            Economics, vol. 11, pp. 109–138, 2019.
          </p>
        </div>
      </Fade>
    </div>
  );
};

export default About;
